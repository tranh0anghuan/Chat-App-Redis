"use server"

import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type SendMessageActionArgs = {
    content: string;
    receiverId: string;
    messageType: "text" | "image";
}

export async function sendMessageAction({content, receiverId,messageType}:SendMessageActionArgs){
    const {getUser} = getKindeServerSession();
    const user = await getUser()

    if (!user) return { success: false, message: "User not authenticated" };

	const senderId = user.id;

	const conversationId = `conversation:${[senderId, receiverId].sort().join(":")}`;
    // john sends a message to jane
	// senderId: 123, receiverId: 456
	// `conversation:123:456`

    const conversationExists = await redis.exists(conversationId);

	if (!conversationExists) {
		await redis.hset(conversationId, {
			participant1: senderId,
			participant2: receiverId,
		});

		await redis.sadd(`user:${senderId}:conversations`, conversationId);
		await redis.sadd(`user:${receiverId}:conversations`, conversationId);

	}

    // Generate a unique message id
	const messageId = `message:${Date.now()}:${Math.random().toString(36).substring(2, 9)}`;
	const timestamp = Date.now();

    // Create the message hash
	await redis.hset(messageId, {
		senderId,
		content,
		timestamp,
		messageType,
	});

	await redis.zadd(`${conversationId}:messages`, { score: timestamp, member: JSON.stringify(messageId) });

	// const channelName = `${senderId}__${receiverId}`.split("__").sort().join("__");

	// await pusherServer?.trigger(channelName, "newMessage", {
	// 	message: { senderId, content, timestamp, messageType },
	// });

	return { success: true, conversationId, messageId };
}