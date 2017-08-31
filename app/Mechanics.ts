export { Mechanics };

import Engineer from "./Engineer";

import { GameScene } from "./GameScene";
import { Player, PlayerKeyPress } from "./Player";
import { Element } from "./Elements/Element";
import { Glow } from "./Elements/Glow";

class Mechanics
{
    private _Players:Player[];
    private _PlayersKeys:PlayerKeyPress[];
    private _Scene:GameScene;
    public constructor(Player1:Player, Player2:Player, Scene:GameScene)
    {
        this._Players = [Player1, Player2];
        this._Scene = Scene;
    }
    public Update()
    {
        let Elements:Element[] = this._Scene.GetObjectsWithData("Element");
        for(let i = 0; i < Elements.length; i++) Elements[i].Update();
        let Glows:Glow[] = this._Scene.GetObjectsWithData("Glow");
        for(let i = 0; i < Glows.length; i++) Glows[i].Update();
    }
    public Reset()
    {
        let Elements:Element[] = this._Scene.GetObjectsWithData("Element");
        for(let i = 0; i < Elements.length; i++) Elements[i].Reset();
        let Glows:Element[] = this._Scene.GetObjectsWithData("Glow");
        for(let i = 0; i < Elements.length; i++) Glows[i].Reset();
    }
}