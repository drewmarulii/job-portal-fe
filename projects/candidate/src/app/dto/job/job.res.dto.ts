export interface JobResDto {
	id: string;
	jobName: string;
	companyName: string;
	address: string;
	startDate: string;
	endDate: string;
	description: string;
	expectedSalaryMin: string;
	expectedSalaryMax: string;
	employementTypeName: string;
	fileId: string;
	isBookmark: boolean;
	companyPhotoId : string;
}