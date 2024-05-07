'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { CircleCheck, Star } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { updateUserEventStatus } from '@/server-actions/events';
import { type UserEventStatus } from '@/types/event-data';

export const StatusButton = ({
	eventId,
	initialStatus
}: {
	eventId: string;
	initialStatus: UserEventStatus;
}) => {
	const [status, setStatus] = useState<UserEventStatus>(initialStatus);
	const [loading, setLoading] = useState(false);

	const onStatusButtonClick = async () => {
		setLoading(true);
		switch (status) {
			case 'not-interested':
				await updateUserEventStatus(eventId, 'interested')
					.then(_ => {
						setLoading(false);
					})
					.catch(err => toast.error(err.message));
				break;
			case 'interested':
				await updateUserEventStatus(eventId, 'going')
					.then(_ => {
						setLoading(false);
					})
					.catch(err => toast.error(err.message));
				break;
			case 'going':
				await updateUserEventStatus(eventId, null)
					.then(_ => {
						setLoading(false);
					})
					.catch(err => toast.error(err.message));
				break;
		}
		setStatus(getNextStatus(status));
	};

	return (
		<Button
			className={`${getButtonStyle(status)} flex items-center justify-center mr-3
			 h-1 sm:h-16 text-xs px-1 py-0 sm:px-3 sm:py-1 md:px-8 lg:py-2 transition-width transition-hover duration-300`}
			onClick={onStatusButtonClick}
		>
			{status === 'not-interested' && (
				<div className="flex items-center gap-2">
					{loading ? (
						<object
							width={24}
							type="image/svg+xml"
							height={24}
							data="/static/star-animated.svg"
							className="h-3 w-3 sm:h-6 sm:w-6"
						/>
					) : (
						<Image
							width={24}
							height={24}
							src="/static/star.svg"
							alt="star"
							className="h-3 w-3 sm:h-6 sm:w-6"
						/>
					)}
					Interested
				</div>
			)}

			{status === 'interested' && (
				<Star
					width={24}
					height={24}
					className={`h-3 w-3 sm:h-6 sm:w-6 text-white ${loading && 'animate-pulse'}`}
				/>
			)}

			{status === 'going' && (
				<CircleCheck
					width={32}
					height={32}
					className={`h-4 w-4 sm:h-8 sm:w-8 text-[#108A0D] ${loading && 'animate-pulse'}`}
				/>
			)}
		</Button>
	);
};

const getButtonStyle = (status: UserEventStatus) => {
	switch (status) {
		case 'not-interested':
			return 'w-[120px] sm:w-[250px]';
		case 'interested':
			return 'w-[90px] bg-gray-800 border-2 border-primary hover:bg-gray-900 hover:border-2 hover:border-primary';
		case 'going':
			return 'w-[100px] bg-gray-800 shadow-[#108A0D] hover:bg-gray-900';
	}
};

const getNextStatus = (status: UserEventStatus): UserEventStatus => {
	switch (status) {
		case 'not-interested':
			return 'interested';
		case 'interested':
			return 'going';
		case 'going':
			return 'not-interested';
	}
};
