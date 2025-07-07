export interface IBlogRepository{
    create(input:any):Promise<any>;
    findOne(slug:string):Promise<any>;
    findMany(limit:number,skip:number):Promise<any>;
    update(slug:string,input:any):Promise<any>;
    delete(slug:string):Promise<any>;
}