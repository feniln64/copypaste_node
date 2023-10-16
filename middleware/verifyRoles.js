const verifyRoles = (...roles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.status(403).send('Forbidden! Roles not found');
        }
        const rolesArray = [...roles];
        const hasRole = req.roles.map(role => rolesArray.includes(role)).find(role => role === true);

        if (!hasRole) {
            return res.status(403).send('Forbidden! You are not authorized to access this route');
        }
        next();
    }
}

module.exports = verifyRoles;