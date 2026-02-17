import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
} from 'class-validator'

enum SpaceUnitType {
    DESK = 'DESK',
    PRIVATE_ROOM = 'PRIVATE_ROOM',
    METTING_ROOM = 'MEETING_ROOM',
}

export class CreateSpaceUnitDto {
    @IsEnum(SpaceUnitType)
    type: SpaceUnitType

    @IsString()
    @IsNotEmpty()
    name: string

    @IsInt()
    @Min(1)
    capacity: number

    @IsNumber()
    @Min(0)
    pricePerHour: number

    @IsNumber()
    @Min(0)
    pricePerDay: number
}
