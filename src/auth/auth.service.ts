import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(email: string, password: string, name: string) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        })
        if (existingUser) {
            throw new ConflictException('Email already exists')
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const user = await this.prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
                role: 'USER',
            },
        })

        const token = this.generateToken(user)

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash,
        )

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const token = this.generateToken(user)

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        }
    }

    private generateToken(user: any) {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        })
    }
}
