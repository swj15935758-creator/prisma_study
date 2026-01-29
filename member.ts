import { PrismaClient } from "@prisma/client"
import type { MemberCreateDTO, MemberDTO } from "./domain/entity/member.dto.js";

const prisma = new PrismaClient();

(async () => {
    // prisma.모델명.메서드명
    // ex) prisma.member.create({ data: 데이터! })

    // 단일 추가
    const member1:MemberCreateDTO = {
        memberEmail: "test123@gmail.com",
        memberPassword: "test123!@#",
        memberName: "홍길동",
        memberAge: 20,
    }

    // const createdMember = await prisma.member.create({
    //     data: member1
    // })

    // console.log(createdMember)

    // 여러 개 추가
    // .createMany({data: []})
    const member2:MemberCreateDTO = {
        memberEmail: "test234@gmail.com",
        memberPassword: "test123!@#",
        memberName: "장보고",
        memberAge: 30,
    }
    const member3:MemberCreateDTO = {
        memberEmail: "test456@gmail.com",
        memberPassword: "test123!@#",
        memberName: "이순신",
        memberAge: 35,
    }
    const member4:MemberCreateDTO = {
        memberEmail: "test789@gmail.com",
        memberPassword: "test123!@#",
        memberName: "김철수",
        memberAge: 40,
    }
    
    // 회원 여러명 추가
    // const members = [member2, member3, member4];
    // const createdMembers = await prisma.member.createMany({
    //     data: members
    // })

    // console.log(createdMembers)


    // 단일 회원 조회
    // const foundMember = await prisma.member.findUnique({
    //     where: {id: 1}
    // })

    // console.log(foundMember)

    // AND, OR, NOT
    // const foundMember2 = await prisma.member.findFirst({
    //     where: {
    //         OR: [{memberAge: 35}, {memberAge: 50}]
    //     }
    // })

    // console.log(foundMember2)
    
    // const foundMember3 = await prisma.member.findFirst({
    //     where: {
    //         AND: [{memberAge: 20}, {memberName: "홍길동"}]
    //     }
    // })

    // console.log(foundMember3)

    // NOT
    // const foundMember4 = await prisma.member.findFirst({
    //     where: {
    //         NOT: [{memberName: "홍길동"}, {memberName: "장보고"}, {memberName: "이순신"}]
    //     }
    // })

    // console.log(foundMember4)
    // 여러개 조회
    // .findMany()
    // const foundMembers1 = await prisma.member.findMany({
    //     where: {
    //         OR: [{memberName: "홍길동"}, {memberAge: 40}]
    //     }
    // })

    // foundMembers1.forEach((member) => {
    //     console.log(member)
    // })

    // gt(초과)
    // 나이가 20살보다 큰 회원들을 모두
    // const foundMembers = await prisma.member.findMany({
    //     where: {
    //         memberAge: {gt: 20}
    //     }
    // })
    // console.log(foundMembers)

    // gte(이상)
    // 나이가 30살 이상인 회원 전체를 조회
    const foundMember2 = await prisma.member.findMany({
        where: {
            memberAge: {gte: 30}
        }
    })

    // console.log(foundMember2)

    // lt(미만): 나이가 45살 미만인 회원들 조회
    // lte(이하): 나이가 20살 이하인 회원 전체를 조회

    // 회원 정보 수정
    // 조회 -> 수정
    const foundMember:MemberDTO | null = await prisma.member.findUnique({
        where: {id: 1}
    })

    // 방어 코드
    if(!foundMember){
        throw new Error("회원이 존재하지 않습니다.")
    }

    // const updatedMember = await prisma.member.update({
    //     where: {id: foundMember.id},
    //     data: {
    //         memberName: "장길동",
    //         memberAge: 20
    //     }
    // })

    // console.log(updatedMember)

    // 회원 삭제
    const deletedMember = await prisma.member.delete({
        where: {id: 1}
    })

    console.log(deletedMember)

    // 삭제 후 조회
    const foundMembers = await prisma.member.findMany()
    console.log("전체 조회", foundMembers)

})()