declare type Emoji = {
  userImage: string;
  userName: string;
  created: Date;
  aliases: Emoji[];
  isAlias: boolean;
  name: string;
  image: string;
};

declare type Workspace = {
  name: string;
  domain: string;
  icon: string;
  token: string;
};
