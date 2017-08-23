export { Mechanics };

import Engineer from "./Engineer";

import { GameScene } from "./GameScene";
import { Player, PlayerKeyPress } from "./Player";

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
        
    }
}