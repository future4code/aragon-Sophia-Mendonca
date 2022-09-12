import { IProductDB, ITagDB, ITagsProductsDB } from "../../models/Products"
import { IUserDB, USER_ROLES } from "../../models/User"

export const users: IUserDB[] = [
  {
    id: "101",
    name: "Sophia",
    email: "sophia@gmail.com",
    password: "$2a$12$LkWMqS3oPhP2iVMcZOVvWer9ahUPulxjB0EA4TWPxWaRuEEfYGu/i", // asdfg123 
    role: USER_ROLES.ADMIN
  },
  {
    id: "102",
    name: "Suzy",
    email: "suzy@gmail.com",
    password: "$2a$12$PULtVNlAll87D6E8pR/0HO9vbzVDPaUMA89rc5cNmYoAAepbwmkcO", // qwerty00
    role: USER_ROLES.NORMAL
  },
  {
    id: "103",
    name: "WIllian",
    email: "willian@gmail.com",
    password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC", // bananinha
    role: USER_ROLES.NORMAL
  }
]

export const products: IProductDB[] = [
  {
    id: '8371',
    name: 'VESTIDO TRICOT CHEVRON',
  },
  {
    id: '8367',
    name: 'VESTIDO MOLETOM COM CAPUZ MESCLA',
  },
  {
    id: '8363',
    name: 'VESTIDO CURTO MANGA LONGA LUREX',
  },
];

export const tags: ITagDB[] = [
  {
    id: "101",
    tag: 'balada',
  },
  {
    id: "102",
    tag: 'neutro',
  },
  {
    id: "103",
    tag: 'delicado',
  },

];
export const tagsProducts: ITagsProductsDB[] = [
  {
    id: '201',
    product_id: '8371',
    tag_id: '101',
  },
  {
    id: '202',
    product_id: '8371',
    tag_id: '102',
  },
  {
    id: '203',
    product_id: '8371',
    tag_id: '103',
  }
];
