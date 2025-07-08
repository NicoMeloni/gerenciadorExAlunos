const activeSessions = {};

async function authenticateToken(req, res, next){
    const matriculaLogada = req.headers['authorization'];
    if (!matriculaLogada) return res.status(401).json({ message: 'Acesso negado. Credenciais de sessão não fornecidas.' });
    if (activeSessions[matriculaLogada]) {
        req.userMatricula = matriculaLogada;
        next();
    } else {
        res.status(403).json({ message: 'Sessão inválida ou expirada. Faça login novamente.' });
    }
}

module.exports = { authenticateToken, activeSessions}; 