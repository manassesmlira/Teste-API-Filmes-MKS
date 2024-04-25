import { createParamDecorator } from "@nestjs/common";

export const getUser = createParamDecorator((data, ctx) => {
   return ctx.switchToHttp().getRequest().user;

  });