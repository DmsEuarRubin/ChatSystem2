const bcrypt = require('bcrypt');

module.exports = async function (req, res) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    return hash;
}