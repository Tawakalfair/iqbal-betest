import bcrypt from 'bcrypt';

const saltRounds = 10;

async function hashPwd(plaintextPassword) {
    return await bcrypt.hash(plaintextPassword, saltRounds);
}

async function comparePwd(pwd, pwdHash) {
    return await bcrypt.compare(pwd, pwdHash);
}

export { hashPwd, comparePwd }