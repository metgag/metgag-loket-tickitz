function authValidation(email, pwd) {
    let [isEmail, isPwd] = [false, false];

    // Validasi Email
    // field email tidak boleh kosong
    if (email === null || email === "") {
        setEmailErr(() => "Field email tidak boleh kosong");
    } else {
        // validasi format email
        const reMail = /^[\w-.]+@[a-z]{5,}.com$/;
        if (!reMail.test(email.value)) {
            setEmailErr(() => "Format email tidak sesuai");
        } else {
            setEmailErr("");
            Object.assign(result, {
                email: email.value
            });
            isEmail = true;
        }
    }

    // Validasi Password
    // field password tidak boleh kosong
    if (pwd === null || pwd === "") {
        setPwdErr("Field password tidak boleh kosong");
    } else {
        // validasi minimal 8 karakter
        if (pwd.value.length < 8) {
            setPwdErr("Password minimal 8 karakter");
        } else {
            // validasi format
            const rePwd = /^(?=.*[a-z])(?=.+[A-Z])(?=.+[!@#$%^&*/><]).{8,}$/;
            if (!rePwd.test(pwd.value)) {
                setPwdErr("Password harus memiliki minimal 8 karakter, huruf kecil, huruf besar, dan satu karakter spesial (!@#$%^&*/><)");
            } else {
                setPwdErr("");
                Object.assign(result, {
                    pwd: pwd.value
                });
                isPwd = true;
            }
        }
    }

    if (isEmail, isPwd) {
        return true;
    }
    return false;
}

export default authValidation;
