const { getAllWorks, getWorkByID, updateWork, getAllReports, createReport, deleteReport, updateReport, getReportById } = require("../models/worker.model")
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { saveImage } = require("../middlewares/upload");

const getAllWorksController = async (req, res) => {
    const id = req.params.id
    try {
        const data = await getAllWorks(id)
        console.log("<================ LOS TRABAJOS QUE REALIZA ESTE TRABAJADOR SON: ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const getWorkByIDController = async (req, res) => {
    const id = req.params.id
    try {
        const data = await getWorkByID(id)
        console.log(data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const updateWorkController = async (req, res) => {
    const id = req.params.id
    const { job_status } = req.body
    try {
        const newWork = await updateWork(id, {job_status})
        if (newWork) {
            return res.status(200).json({
                ok: true,
                msg: "Trabajo actualizado",
                newWork
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, trabajo no encontrado",
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error, contacte con el administrador',
        })
    }
}

const getAllReportsController = async (req, res) => {
    const id = req.params.id
    try {
        const data = await getAllReports(id)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const getReportByIdController = async (req, res) => {
    const id = req.params.id
    try {
        const data = await getReportById(id)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const downloadReportsPDF = async (req, res) => {
    const id = req.params.id;
    try {
        const reports = await getAllReports(id);
        // if (!reports || reports.length === 0) {
        //     return res.status(404).json({
        //         ok: false,
        //         msg: "No hay reportes para este trabajo",
        //     });
        // }
        const doc = new PDFDocument({ margin: 50 });
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=reportes_trabajo_${id}.pdf`
        );
        doc.pipe(res);
        doc.fontSize(18).text(`Reportes del trabajo #${id}`, { align: "center" });
        doc.moveDown();

        const maxImageHeight = 250; // Altura máxima de la imagen
        const pageBottom = doc.page.height - doc.page.margins.bottom;

        reports.forEach((report, index) => {
            doc
                .fontSize(12)
                .text(`ID del reporte : ${report.report_id}`)
                .text(`ID del trabajador: ${report.worker_user_id}`)
                .text(`Notas: ${report.report_notes}`)
                .text( `Fecha: ${new Date(report.report_created_at).toLocaleString()}` );
            
            doc.moveDown(0.5);

            if (report.report_photo_url) {
                const imagePath = path.join(process.cwd(), "src", "public", "upload", report.report_photo_url);
                if (fs.existsSync(imagePath)) {
                    const remainingSpace = pageBottom - doc.y;
                    if (remainingSpace < maxImageHeight) {
                        doc.addPage();
                    }
                    doc.image(imagePath, { width: 250 });
                    doc.moveDown(1);
                }
            }

            if (index < reports.length - 1) {
                doc.moveDown(1);
                doc.strokeColor('#aaaaaa')
                    .lineWidth(1)
                    .moveTo(doc.page.margins.left, doc.y)
                    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
                    .stroke();
                doc.moveDown(1);
            }
        });
        
        doc.end();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al generar el PDF",
        });
    }
};

const createReportController = async (req, res) => {
    const { job_id, worker_user_id } = req.params;
    const { report_notes } = req.body;

    try {
        let report_photo_url = null;
        if (req.file) {
            report_photo_url = saveImage(req.file);
        }
        const data = await createReport(job_id, worker_user_id, report_notes, report_photo_url);

        return res.status(201).json({
            ok: true,
            msg: "Reporte creado correctamente",
            data
        });
    } catch (error) {
        console.error("Error creando reporte:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al crear el reporte, contacte con el administrador"
        });
    }
};


const updateReportController = async (req, res) => {
    const { report_id, uid } = req.params;
    const { report_notes } = req.body;

    try {
        const existsReport = await getReportById(report_id)
        if (!existsReport) {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, reporte no encontrado",
            })
        } else {
            if (uid != existsReport.worker_user_id){
                return res.status(403).json({
                    ok: false,
                    msg: "ERROR 403, NO eres el creador de este reporte",
                })
            } else {
                let report_photo_url = null;
                if (req.file) {
                    report_photo_url = saveImage(req.file);
                }
                const data = await updateReport(report_id, report_notes, report_photo_url);

                return res.status(200).json({
                    ok: true,
                    msg: "Reporte actualizado correctamente",
                    data
                });
            }
        }
    } catch (error) {
        console.error("Error creando reporte:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al actualizar el reporte, contacte con el administrador"
        });
    }
};

const deleteReportController = async (req, res) => {
    const id = req.params.id
    try {
        const deletedReport = await deleteReport(id)
        if (deletedReport) {
            return res.status(200).json({
                ok: true,
                msg: "reporte borrado",
                deletedReport
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, reporte no encontrado",
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error, contacte con el administrador',
        })
    }
}

module.exports = {
    getAllWorksController,
    getWorkByIDController,
    updateWorkController,
    getAllReportsController,
    downloadReportsPDF,
    createReportController,
    deleteReportController,
    updateReportController,
    getReportByIdController
}