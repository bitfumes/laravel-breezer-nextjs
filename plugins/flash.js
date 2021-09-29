import { toast } from "react-toast";

const flash = (type, message, time = 3) => {
  toast[type](message);
};

export default flash;
