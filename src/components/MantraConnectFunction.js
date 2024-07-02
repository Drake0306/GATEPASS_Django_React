import $ from 'jquery';

const uri = "http://localhost:8004/mfs100/"; // Non-Secure

export const GetMFS100Info = () => GetMFS100Client("info")

export const GetMFS100KeyInfo = (key) => {
    const MFS100Request = {
        "Key": key,
    };
    const jsondata = JSON.stringify(MFS100Request);
    return PostMFS100Client("keyinfo", jsondata);
}

export const PostMFS100Client = (method, jsonData) => {
    let res;
    $.support.cors = true;
    let httpStaus = false;
    $.ajax({
        type: "POST",
        async: false,
        crossDomain: true,
        url: uri + method,
        contentType: "application/json; charset=utf-8",
        data: jsonData,
        dataType: "json",
        processData: false,
        success (data) {
            httpStaus = true;
            res = { httpStaus, data };
        },
        error (jqXHR, ajaxOptions, thrownError) {
            res = { httpStaus, err: getHttpError(jqXHR) };
        },
    });
    return res;
}


export const getHttpError = (jqXHR) => {
    let err = "Unhandled Exception";
    if (jqXHR.status === 0) {
        err = 'Service Unavailable';
    } else if (jqXHR.status === 404) {
        err = 'Requested page not found';
    } else if (jqXHR.status === 500) {
        err = 'Internal Server Error';
    } else {
        err = 'Unhandled Error';
    }
    return err;
}

export const GetMFS100Client = (method) => {
    let res;
    $.support.cors = true;
    let httpStaus = false;
    $.ajax({
        type: "GET",
        async: false,
        crossDomain: true,
        url: uri + method,
        contentType: "application/json; charset=utf-8",
        processData: false,
        success (data) {
            httpStaus = true;
            res = { httpStaus, data };
        },
        error (jqXHR, ajaxOptions, thrownError) {
            res = { httpStaus, err: getHttpError(jqXHR) };
        },
    });
    return res;
}


export const CaptureFinger = (quality, timeout) => {
    const MFS100Request = {
        "Quality": quality,
        "TimeOut": timeout
    };
    const jsondata = JSON.stringify(MFS100Request);
    return PostMFS100Client("capture", jsondata);
}
// Devyang Muti Finger Capture
export const CaptureMultiFinger = (quality, timeout,nooffinger) => {
    const MFS100Request = {
        "Quality": quality,
        "TimeOut": timeout,
        "NoOfFinger": nooffinger
    };
    const jsondata = JSON.stringify(MFS100Request);
    return PostMFS100Client("capturewithdeduplicate", jsondata);
}
//


export const VerifyFinger = (ProbFMR, GalleryFMR) => {
    const MFS100Request = {
        "ProbTemplate": ProbFMR,
        "GalleryTemplate": GalleryFMR,
        "BioType": "FMR" // you can paas here BioType as "ANSI" if you are using ANSI Template
    };
    const jsondata = JSON.stringify(MFS100Request);
    return PostMFS100Client("verify", jsondata);
}
export const MatchFinger = (quality, timeout, GalleryFMR) => {
    const MFS100Request = {
        "Quality": quality,
        "TimeOut": timeout,
        "GalleryTemplate": GalleryFMR,
        "BioType": "FMR" // you can paas here BioType as "ANSI" if you are using ANSI Template
    };
    const jsondata = JSON.stringify(MFS100Request);
    return PostMFS100Client("match", jsondata);
}
export const GetPidData = (BiometricArray) => {
    const req = new MFS100Request(BiometricArray);
    const jsondata = JSON.stringify(req);
    return PostMFS100Client("getpiddata", jsondata);
}

export const GetRbdData = (BiometricArray) => {
    const req = new MFS100Request(BiometricArray);
    const jsondata = JSON.stringify(req);
    return PostMFS100Client("getrbddata", jsondata);
}


/// //////// Classes

export const Biometric = (BioType, BiometricData, Pos, Nfiq, Na) => {
    this.BioType = BioType;
    this.BiometricData = BiometricData;
    this.Pos = Pos;
    this.Nfiq = Nfiq;
    this.Na = Na;
}

export const MFS100Request = (BiometricArray) => {
    this.Biometrics = BiometricArray;
}