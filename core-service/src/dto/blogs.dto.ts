import { IsDate, IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateBlogRequest{
    @IsString()
    @IsNotEmpty()
    title:string;
    @IsString()
    @IsNotEmpty()
    content:string;
    @IsDateString()
    publishedAt:Date;

}
export class UpdateBlogRequest{
    @IsString()
    @IsNotEmpty()
    title:string;
    @IsString()
    @IsNotEmpty()
    content:string;
    @IsDate()
    publishedAt:Date;

}