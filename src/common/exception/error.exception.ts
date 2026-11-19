



export class Applecation_error extends Error{
    constructor(message:string ,public status: number, cause: unknown){
      super(message,{cause})
      this.name = this.constructor.name
    }
}


export class bad_Request_error extends Applecation_error{
    constructor(message:string= "Bad Request" , cause?: unknown){
        super(message,400,cause)
    }
}

export class unAuthorized_error extends Applecation_error{
    constructor(message:string= "UnAuthorized" , cause?: unknown){
        super(message,401,cause)
    }
}


export class forbidden_error extends Applecation_error{
    constructor(message:string= "Forbidden" , cause?: unknown){
        super(message,403,cause)
    }
}


export class not_Found_error extends Applecation_error{
    constructor(message:string= "Not Found" , cause?: unknown){
        super(message,404,cause)
    }
}


