import type { PostDTO } from "./post.dto.js";

export type MemberDTO = {
    id: number;
    memberEmail: string;
    memberPassword: string;
    memberName: string;
    memberAge?: number | null;
    memberCreateAt: Date;

    posts?: PostDTO[]
}

export type MemberCreateDTO = {
    memberEmail: string;
    memberPassword: string;
    memberName: string;
    memberAge?: number | null;
}