const getRoleIdByName = (roleName) => {
  switch(roleName.toLowerCase()) {
    case "admin": return 1;
    case "office": return 2;
    case "worker": return 3;
    default: throw new Error("Rol no válido");
  }
}

module.exports={
    getRoleIdByName
}