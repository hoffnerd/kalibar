
import { type ScriptProps } from "next/script";



//______________________________________________________________________________________
// ===== Types & Interfaces =====


interface Primitive_NarrativeDisplayComponent {
    component: "br" | "hr" | "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    display: Array<string | NarrativeDisplayComponent>;
}

export type NarrativeDisplayComponent = Primitive_NarrativeDisplayComponent & ScriptProps

interface NarrativeChoice {
    key: StoryNarrativeKey;
    display: string;
}

export interface StoryNarrative {
    key: string;
    display: Array<string | NarrativeDisplayComponent>;
    type: "narrative" | "character";
    character?: "???" | "dante" | "zig" | "zorg";
    nextNarrative?: StoryNarrativeKey;
    choices?: Array<NarrativeChoice>;
}



//______________________________________________________________________________________
// ===== Story Narratives =====

const copyPaste: StoryNarrative = {
    key: "copyPaste",
    display: [
        `Copy/Paste`,
        {
            component: "span",
            display: [ `Copy/Paste` ],
            className: ""
        },
    ],
    type: "narrative",
    character: "dante",
    nextNarrative: "beta_1",
    choices: [
        { key:"beta_1", display:"" },
    ],
}

export const DEFAULT_STORY_NARRATIVE: StoryNarrative = {
    key: "DEFAULT_STORY_NARRATIVE",
    display: [ "DEFAULT_STORY_NARRATIVE" ],
    type: "narrative",
    nextNarrative: "beta_1",
}

const beta_1: StoryNarrative = {
    key: "beta_1",
    display: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    type: "narrative",
    nextNarrative: "beta_2",
}

const beta_2: StoryNarrative = {
    key: "beta_2",
    display: [
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim",
        {
            component: "span",
            display: [ `ZZZZZIIIIIIIIGGGGGG` ],
            className: "neonEffect neText neTextGlow neColorRed"
        },
        "ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur."
    ],
    type: "character",
    character: "dante",
    choices: [
        { key:"beta_2_a", display:"Beta 2A" },
        { key:"beta_2_b", display:"Beta 2B" },
        { key:"beta_2_c", display:"Beta 2C" },
    ],
}

const beta_2_a: StoryNarrative = {
    key: "beta_2_a",
    display: [
        `Vestibulum vehicula sapien ex, id mollis massa mattis in. Nam enim velit, tempor laoreet maximus id, elementum id erat.`,
    ],
    type: "character",
    character: "dante",
    nextNarrative: "beta_2_a_1",
}

const beta_2_b: StoryNarrative = {
    key: "beta_2_b",
    display: [
        `Quisque efficitur tincidunt justo vel malesuada. Phasellus imperdiet efficitur velit, nec aliquet ex ullamcorper sed.`,
    ],
    type: "narrative",
    nextNarrative: "beta_3",
}

const beta_2_c: StoryNarrative = {
    key: "beta_2_c",
    display: [
        `Integer eu mauris eget nunc hendrerit euismod sed ac mi. Integer malesuada felis justo, ut rutrum odio viverra at. Aliquam a fringilla felis, id consectetur lorem.`,
    ],
    type: "narrative",
    nextNarrative: "beta_3",
}

const beta_2_a_1: StoryNarrative = {
    key: "beta_2_a_1",
    display: [
        `beta_2_a_1`,
        {
            component: "span",
            display: [ `beta_2_a_1` ],
            className: "neonEffect neText neTextGlow neColorBlue"
        },
        `beta_2_a_1`,
    ],
    type: "narrative",
    character: "dante",
    nextNarrative: "beta_3",
}

const beta_3: StoryNarrative = {
    key: "beta_3",
    display: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    type: "narrative",
}


//______________________________________________________________________________________
// ===== Export =====

export type StoryNarrativeKey = 
    "beta_1"
    | "beta_2"
    | "beta_2_a"
    | "beta_2_a_1"
    | "beta_2_b"
    | "beta_2_c"
    | "beta_3"


export const STORY_NARRATIVE = {
    beta_1,
    beta_2,
    beta_2_a,
    beta_2_a_1,
    beta_2_b,
    beta_2_c,
    beta_3,
}