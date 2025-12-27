import prisma from "../db/prisma.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

export const getAllNotifications = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const notifications = await prisma.notification.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 30, // limit for performance
        select: {
            id: true,
            isRead: true,
            createdAt: true,
            videoId: true
        }
    });

    return res.status(200).json(
        new ApiResponse(200, notifications, "Notifications fetched")
    );
});

export const getUnreadNotificationCount = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const count = await prisma.notification.count({
        where: {
            userId,
            isRead: false
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            { unreadCount: count },
            "Unread notification count fetched"
        )
    );
});


export const markNotificationRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const notification = await prisma.notification.findUnique({
        where: { id: notificationId }
    });

    if (!notification || notification.userId !== userId) {
        throw new ApiError(404, "Notification not found");
    }

    await prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true }
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "Notification marked as read")
    );
});

export const markAllNotificationsRead = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await prisma.notification.updateMany({
        where: {
            userId,
            isRead: false
        },
        data: {
            isRead: true
        }
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "All notifications marked as read")
    );
});

export const deleteNotification = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const notification = await prisma.notification.findUnique({
        where: { id: notificationId }
    });

    if (!notification || notification.userId !== userId) {
        throw new ApiError(404, "Notification not found");
    }

    await prisma.notification.delete({
        where: { id: notificationId }
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "Notification deleted")
    );
});

export const deleteAllNotification = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const result = await prisma.notification.deleteMany({
        where: { userId }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            { deletedCount: result.count },
            "All notifications deleted"
        )
    );
});

