// MEMO: I don't know why eslint claims this
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  icon: {
    // MEMO: add other sizes as needed
    image_34: string;
    image_44: string;
  };
  token: string;
};

declare type Theme = "Light" | "Dark";
