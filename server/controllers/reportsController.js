import AsyncHandler from "express-async-handler";
import { getTodaypReports, getTodayuReports, getOngoingpReports, getOngoinguReports } from "../models/reportsModel.js";
import { getuReportsND, getpReportsND, getuReportsD, getpReportsD } from "../models/reportsModel.js";
import { getpReportDetails, getpDetails, getallprDetails, getallprCount } from "../models/reportsModel.js";
import { updatearchivePost, updateStatus } from "../models/reportsModel.js";

const getTodayPReports = AsyncHandler(async (req, res) => {
    const preports = await getTodaypReports();

    if (preports) {
        res.status(200).json(preports);
    } else {
        res.status(404);
        throw new Error("Posts not found");
    }
});

const getTodayUReports = AsyncHandler(async (req, res) => {
    const ureports = await getTodayuReports();

    if (ureports) {
        res.status(200).json(ureports);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

const getOngoingPReports = AsyncHandler(async (req, res) => {
    const preports = await getOngoingpReports();

    if (preports) {
        res.status(200).json(preports);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

const getOngoingUReports = AsyncHandler(async (req, res) => {
    const ureports = await getOngoinguReports();

    if (ureports) {
        res.status(200).json(ureports);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

const getUserReportsND = AsyncHandler(async (req, res) => {
    const ureports = await getuReportsND();

    if (ureports) {
        res.status(200).json(ureports);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

const getPostReportsND = AsyncHandler(async (req, res) => {
    const preports = await getpReportsND();

    if (preports) {
        res.status(200).json(preports);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

const getUserReportsD = AsyncHandler(async (req, res) => {
    const ureports = await getuReportsD();

    if (ureports) {
        res.status(200).json(ureports);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

const getPostReportsD = AsyncHandler(async (req, res) => {
    const preports = await getpReportsD();

    if (preports) {
        res.status(200).json(preports);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

const getpostReportDetails = AsyncHandler(async (req, res) => {
    const preport = await getpReportDetails(req.query.selectedPost);

    if (preport) {
        res.status(200).json(preport);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

const getPostDetails = AsyncHandler(async (req, res) => {
    const preport = await getpDetails(req.query.selectedPostID);

    if (preport) {
        res.status(200).json(preport);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

const getAllReports = AsyncHandler(async (req, res) => {
    const preport = await getallprDetails(req.query.selectedPostID);

    if (preport) {
        res.status(200).json(preport);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

const getAllReportCount = AsyncHandler(async (req, res) => {
    const preport = await getallprCount(req.query.selectedPostID);

    if (preport) {
        res.status(200).json(preport);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

const archivePost = AsyncHandler(async (req, res) => {
    console.log("Archiving post with ID:", req.query.postID);
    const preport = await updatearchivePost(req.query.postID);
    if (preport) {
        res.status(200).json(preport);
        console.log("Archived post with ID:", req.query.postID);

    } else {
        res.status(404);
        throw new Error("Post not found");
    }
});

const updateReportStatus = AsyncHandler(async (req, res) => {
    console.log("Marking Report Read with ID :", req.query.reportID);
    const result = await updateStatus(req.query.reportID, req.query.updateTo);
    if (result) {
        res.status(200).json(result);
        console.log("Archived post with ID:", req.query.reportID);
    } else {
        res.status(404);
        throw new Error("Report not found");
    }
});


export { getTodayPReports, getTodayUReports, getOngoingPReports, getOngoingUReports, getUserReportsND, getPostReportsND, getUserReportsD, getPostReportsD, getpostReportDetails, getPostDetails, getAllReports, getAllReportCount, archivePost, updateReportStatus };