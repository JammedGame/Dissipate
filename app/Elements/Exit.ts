export { Exit };

import Engineer from "./../Engineer";

import { Element } from "./Element";
import { GameScene } from "./../GameScene";

class Exit extends Element
{
    public constructor(Scene:GameScene)
    {
        super(Scene);
        this.SpriteSets[0].Sprites = [];
        this.SpriteSets[0].Sprites.push("/build/resources/exit.png");
        this.Data["Exit"] = true;
    }
}