import { PrismaClient } from "@prisma/client";
import type { MemberCreateDTO } from "./domain/entity/member.dto.js";
import type { PostCreateDTO } from "./domain/entity/post.dto.js";

const prisma = new PrismaClient();

(async () => {
    // // 회원 1명을 추가
    // const member1:MemberCreateDTO = {
    //     memberEmail: "dog1234@gmail.com",
    //     memberName: "흰둥이",
    //     memberPassword: "1234",
    //     memberAge: 5
    // }

    // const createMember = await prisma.member.create({
    //     data: member1
    // })

    // console.log(createMember)

    const foundMember = await prisma.member.findUnique({
        where: {id: 1}
    })

    console.log("foundMember", foundMember)

    if(foundMember){
        const post1:PostCreateDTO = {
            postTitle: "테스트 게시글 작성1",
            postContent:"테스트 게시글 내용1",
            memberId: foundMember.id
        }

        const createdPost = await prisma.post.create({
            data: post1
        })

        console.log(createdPost)
    }

    if(foundMember){
        // 여러 개 작성
        const post2:PostCreateDTO = {
            postTitle: "게시글2",
            postContent: "게시글 내용2",
            memberId: foundMember.id
        }

        const post3:PostCreateDTO = {
            postTitle: "게시글3",
            postContent: "게시글 내용3",
            memberId: foundMember.id
        }

        const posts:PostCreateDTO[] = [post2, post3]
        const createdPosts = await prisma.post.createMany({
            data: posts
        })

        console.log(createdPosts)
    }

    // JOIN == include(포함)
    // 흰둥이가 작성한 모든 게시글 가져오기
    // const foundMemberWithPosts = await prisma.member.findUnique({
    //     where: { id: foundMember!.id },
    //     include: { 
    //         posts: true,
    //     }
    // })

    // console.log(foundMemberWithPosts?.posts)

    // 게시글을 작성자와 함께 전체 조회
    const foundPostsWithMember = await prisma.post.findMany({
        include: {
            member: true
        }
    })

    // select 문법
    // console.log(foundPostsWithMember)

    // 게시글 전체 및 작성자의 이름만 선택 조회
    const foundPostsWithMemberName = await prisma.post.findMany({
        include: {
            member: {
                select: {
                    memberName: true,
                    memberEmail: true
                }
            }
        }
    })

    // console.log(foundPostsWithMemberName)

    // 게시글 3번 조회와 작성자의 이름 같이 조회 
    // const foundPost = await prisma.post.findUnique({
    //     where: {id: 3},
    //     include: {
    //         member: {
    //             select: {
    //                 memberName: true
    //             }
    //         }
    //     }
    // })

    // console.log(foundPost)

    // 게시글 100개 추가
    // const foundMember = await prisma.member.findUnique({
    //     where: {id: 8}
    // })
    
    // if(foundMember){

    //     const posts:PostCreateDTO[] = []

    //     for(let i = 3; i < 103; i++){
    //         const postTitle = "테스트 추가 작성" + (i + 1)
    //         const postContent = "테스트 추가 작성 내용" + (i + 1)

    //         const post:PostCreateDTO = {
    //             postTitle: postTitle,
    //             postContent: postContent,
    //             memberId: foundMember.id
    //         }

    //         posts.push(post)
    //     }

    //     const count = await prisma.post.createMany({
    //         data: posts
    //     })

    //     console.log(count)
    // }

    // 1. 정렬(orderBy)
    // 최신순
    const foundPosts = await prisma.post.findMany({
        include: {
            member: {
                select: {
                    memberName: true
                }
            }
        },
        orderBy: {
            id: "desc",
            // postCreateAt: "desc" // 최신날짜순
            // postCreateAt: "asc" // 가장오래된순
        }
    })
    // console.log(foundPosts)

    // 2. 페이징 처리
    // 10개
    // 1 -> 1~10
    // 2 -> 11~20
    // Promise.all()
    let page = 2
    let perPage = 10

    const [post, totalCount] = await Promise.all([
        prisma.post.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            orderBy: { id: "asc" },
            include: {
                member: { select: { memberName: true }}
            }
        }),
        prisma.post.count()
    ])

    console.log(post)
    console.log(totalCount)


})()