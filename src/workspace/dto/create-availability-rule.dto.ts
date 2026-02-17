import { IsInt, IsString, Matches, Max, Min } from 'class-validator'

export class CreateAvailabilityRuleDto {
    @IsInt()
    @Min(0)
    @Max(6)
    dayOfWeek: number // 0 = Sunday, 6 = Saturday

    @IsString()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: 'startTime must be in HH:mm format (e.g., 09:00)',
    })
    startTime: string

    @IsString()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: 'endTime must be in HH:mm format (e.g., 09:00)',
    })
    endTime: string
}
