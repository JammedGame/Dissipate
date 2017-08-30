export { Movement };

import Engineer from "./Engineer";

import { GameScene } from "./GameScene";
import { Player, PlayerKeyPress } from "./Player";
import { Mechanics } from "./Mechanics";

class Movement
{
    private _MoveSpeed:number;
    private _Players:Player[];
    private _PlayersKeys:PlayerKeyPress[];
    private _Scene:GameScene;
    private _Colliders:any[];
    private _Moveables:any[];
    private _Mechanics:Mechanics;
    public constructor(Player1:Player, Player2:Player, Scene:GameScene)
    {
        this._MoveSpeed = 5;
        this._Players = [Player1, Player2];
        this._PlayersKeys = [new PlayerKeyPress(), new PlayerKeyPress()];
        this._Scene = Scene;
        this._Mechanics = new Mechanics(Player1, Player2, Scene);
        this._Colliders = [];
        this._Moveables = this._Scene.GetObjectsWithData("Moveable");
        this._Scene.Events.KeyDown.push(this.KeyDown.bind(this));
        this._Scene.Events.KeyUp.push(this.KeyUp.bind(this));
        this._Scene.Events.TimeTick.push(this.GameUpdate.bind(this));
    }
    private KeyDown(G:any, Args:any)
    {
        if(Args.Key == Engineer.Engine.KeyType.KEY_W) this._PlayersKeys[0].Up = true;
        if(Args.Key == Engineer.Engine.KeyType.KEY_S) this._PlayersKeys[0].Down = true;
        if(Args.Key == Engineer.Engine.KeyType.KEY_A) this._PlayersKeys[0].Left = true;
        if(Args.Key == Engineer.Engine.KeyType.KEY_D) this._PlayersKeys[0].Right = true;
        if(Args.Key == Engineer.Engine.KeyType.KEY_NUMPAD8 || Args.Key == Engineer.Engine.KeyType.KEY_UP) this._PlayersKeys[1].Up = true;
        if(Args.Key == Engineer.Engine.KeyType.KEY_NUMPAD4 || Args.Key == Engineer.Engine.KeyType.KEY_DOWN) this._PlayersKeys[1].Down = true;
        if(Args.Key == Engineer.Engine.KeyType.KEY_NUMPAD5 || Args.Key == Engineer.Engine.KeyType.KEY_LEFT) this._PlayersKeys[1].Left = true;
        if(Args.Key == Engineer.Engine.KeyType.KEY_NUMPAD6 || Args.Key == Engineer.Engine.KeyType.KEY_RIGHT) this._PlayersKeys[1].Right = true;
    }
    private KeyUp(G:any, Args:any)
    {
        if(Args.Key == Engineer.Engine.KeyType.KEY_W) this._PlayersKeys[0].Up = false;
        if(Args.Key == Engineer.Engine.KeyType.KEY_S) this._PlayersKeys[0].Down = false;
        if(Args.Key == Engineer.Engine.KeyType.KEY_A) this._PlayersKeys[0].Left = false;
        if(Args.Key == Engineer.Engine.KeyType.KEY_D) this._PlayersKeys[0].Right = false;
        if(Args.Key == Engineer.Engine.KeyType.KEY_NUMPAD8 || Args.Key == Engineer.Engine.KeyType.KEY_UP) this._PlayersKeys[1].Up = false;
        if(Args.Key == Engineer.Engine.KeyType.KEY_NUMPAD4 || Args.Key == Engineer.Engine.KeyType.KEY_DOWN) this._PlayersKeys[1].Down = false;
        if(Args.Key == Engineer.Engine.KeyType.KEY_NUMPAD5 || Args.Key == Engineer.Engine.KeyType.KEY_LEFT) this._PlayersKeys[1].Left = false;
        if(Args.Key == Engineer.Engine.KeyType.KEY_NUMPAD6 || Args.Key == Engineer.Engine.KeyType.KEY_RIGHT) this._PlayersKeys[1].Right = false;
    }
    private GameUpdate(G:any, Args:any)
    {
        this.CalculateCollisions();
        for(let i = 0; i < this._Players.length; i++)
        {
            if(this._PlayersKeys[i].Up) this.TryMovement(this._Players[i], "Top", new Engineer.Math.Vertex(0, -this._MoveSpeed, 0));
            if(this._PlayersKeys[i].Down) this.TryMovement(this._Players[i], "Bottom", new Engineer.Math.Vertex(0, +this._MoveSpeed, 0));
            if(this._PlayersKeys[i].Left) this.TryMovement(this._Players[i], "Left", new Engineer.Math.Vertex(-this._MoveSpeed, 0, 0));
            if(this._PlayersKeys[i].Right) this.TryMovement(this._Players[i], "Right", new Engineer.Math.Vertex(+this._MoveSpeed, 0, 0));
            //this._Players[i].Data["Glow"].Update();
        }
        this._Mechanics.Update();
    }
    private TryMovement(Player:Player, Direction:string, Movement:any)
    {
        if(!Player.Data["Collision_Solid"][Direction] && !Player.Data["Collision_Player"][Direction])
        {
            let Able:boolean = true;
            for(let j = 0; j < Player.Data["Colliders_Moveable_" + Direction].length; j++)
            {
                let Moveable:any = Player.Data["Colliders_Moveable_" + Direction][j];
                if(!Moveable.Data["Collision_Solid"][Direction] && !Moveable.Data["Collision_Player"][Direction])
                {
                    Moveable.Trans.Translation = new Engineer.Math.Vertex(Moveable.Trans.Translation.X + Movement.X, Moveable.Trans.Translation.Y + Movement.Y, 0);
                }
                else Able = false;
            }
            if (Able) Player.Trans.Translation = new Engineer.Math.Vertex(Player.Trans.Translation.X + Movement.X, Player.Trans.Translation.Y + Movement.Y, 0);
            Player.Modified = true;
        }
    }
    private CalculateCollisions()
    {
        this._Colliders = this._Scene.GetObjectsWithData("Solid", true);
        for(let i = 0; i < this._Players.length; i++)
        {
            Engineer.Util.Collision.CalculateObjectCollisions("Solid", this._Players[i], this._Colliders);
            Engineer.Util.Collision.CalculateObjectCollisions("Moveable", this._Players[i], this._Moveables);
            Engineer.Util.Collision.CalculateObjectCollisions("Player", this._Players[i], this._Players);
        }
        for(let i = 0; i < this._Moveables.length; i++)
        {
            Engineer.Util.Collision.CalculateObjectCollisions("Solid", this._Moveables[i], this._Colliders);
            Engineer.Util.Collision.CalculateObjectCollisions("Moveable", this._Moveables[i], this._Moveables);
            Engineer.Util.Collision.CalculateObjectCollisions("Player", this._Moveables[i], this._Players);
        }
    }
}