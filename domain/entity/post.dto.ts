import type { MemberDTO } from "./member.dto.js";

export type PostDTO = {
    id: number;
    postTitle: string;
    postContent: string;
    postStatus: String;
    postCreateAt: Date;

    member?: MemberDTO;
}

export type PostCreateDTO = {
    postTitle: string;
    postContent: string;
    memberId: number;
}