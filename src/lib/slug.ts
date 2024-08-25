import { nanoid } from "nanoid";

const generateSlug = nanoid().substring(1, 6);

export { generateSlug };
