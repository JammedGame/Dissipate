export { Movement };

import Engineer from "./Engineer";

import { GameScene } from "./GameScene";
import { Player, PlayerKeyPress } from "./Player";

class Movement
{
    private _MoveSpeed:number;
    private _Players:Player[];
    private _PlayersKeys:PlayerKeyPress[];
    private _Scene:GameScene;
    private _Colliders:any[];
    private _Moveables:any[];
    //Mechanics
    public constructor(Player1:Player, Player2:Player, Scene:GameScene)
    {
        this._MoveSpeed = 5;
        this._Players = [Player1, Player2];
        this._Scene = Scene;
        this._Colliders = [];
        this._Moveables = this._Scene.GetObjectsWithData("Moveable");
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
            this._Players[i].Data["Glow"].Update();
        }
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
        }
    }
    private CalculateCollisions()
    {
        this._Colliders = this._Scene.GetObjectsWithData("Collision");
        for(let i = 0; i < this._Players.length; i++)
        {
            this.CalculateObjectCollisions("Solid", this._Players[i], this._Colliders);
            this.CalculateObjectCollisions("Moveable", this._Players[i], this._Moveables);
            this.CalculateObjectCollisions("Player", this._Players[i], this._Players);
        }
        for(let i = 0; i < this._Moveables.length; i++)
        {
            this.CalculateObjectCollisions("Solid", this._Moveables[i], this._Colliders);
            this.CalculateObjectCollisions("Moveable", this._Moveables[i], this._Moveables);
            this.CalculateObjectCollisions("Player", this._Moveables[i], this._Players);
        }
    }
    private CalculateObjectCollisions(Type:string, Object:any, Colliders:any[])
    {
        Object.Data["Collision_"+Type] = new Engineer.Math.CollisionValue();
        Object.Data["Colliders_"+Type] = [];
        Object.Data["Colliders_"+Type+"_Left"] = [];
        Object.Data["Colliders_"+Type+"_Right"] = [];
        Object.Data["Colliders_"+Type+"_Top"] = [];
        Object.Data["Colliders_"+Type+"_Bottom"] = [];
        for(let i = 0; i < Colliders.length; i++)
        {
            if(Object.ID == Colliders[i].ID) continue;
            let Collider1 = this.CreateColliderObject(Object);
            let Collider2 = this.CreateColliderObject(Colliders[i]);
            let Collision = Engineer.Math.Collision.Check(Collider1, Collider2);
            if(Collision.Collision)
            {
                Object.Data["Collision_"+Type] = this.CombineCollisionValues(Object.Data["Collision_"+Type], Collision);
                Object.Data["Colliders_"+Type].push(Colliders[i]);
                if(Collision.Left) Object.Data["Colliders_"+Type+"_Left"].push(Colliders[i]);
                if(Collision.Right) Object.Data["Colliders_"+Type+"_Right"].push(Colliders[i]);
                if(Collision.Top) Object.Data["Colliders_"+Type+"_Top"].push(Colliders[i]);
                if(Collision.Bottom) Object.Data["Colliders_"+Type+"_Bottom"].push(Colliders[i]);
            }
        }
    }
    private CreateColliderObject(Object:any) : any
    {
        let Collider = new Engineer.Math.ColliderObject();
        Collider.Position = Object.Trans.Translation;
        Collider.Scale= Object.Trans.Scale;
        Collider.Type = Object.Data["CollisionType"];
    }
    private CombineCollisionValues(CollisionValue1:any, CollisionValue2:any) : any
    {
        let NewCollisionValue = new Engineer.Math.CollisionValue();
        NewCollisionValue.Collision = CollisionValue1.Collision || CollisionValue2.Collision;
        NewCollisionValue.Bottom = CollisionValue1.Bottom || CollisionValue2.Bottom;
        NewCollisionValue.Top = CollisionValue1.Top || CollisionValue2.Top;
        NewCollisionValue.Left = CollisionValue1.Left || CollisionValue2.Left;
        NewCollisionValue.Right = CollisionValue1.Right || CollisionValue2.Right;
    }
}