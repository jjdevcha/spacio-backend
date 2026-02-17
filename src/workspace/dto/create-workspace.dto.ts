import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateWorkspaceDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsNumber()
    latitude: number

    @IsNumber()
    longitude: number

    @IsString()
    @IsOptional()
    imageUrl?: string

    @IsString()
    @IsOptional()
    cancellationPolicy?: string
}
