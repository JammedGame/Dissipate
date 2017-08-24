export { LevelPicker };

import Engineer from "./Engineer";

import { GameScene } from "./GameScene";
import { LocalSettings } from "./LocalSettings";

class LevelPicker extends Engineer.Engine.Scene2D
{
    private _Left:any;
    private _Right:any;
    private _LevelDisplay:any;
    private _PlayerProgress:number;
    public constructor()
    {
        super();
        this.Name = "LevelPicker";
        this._PlayerProgress = 8;
        this.Trans.Scale = new Engineer.Math.Vertex(LocalSettings.Window.Y / LocalSettings.Scale.Y, LocalSettings.Window.Y / LocalSettings.Scale.Y, 1);
        let Backgrounds:any = new Engineer.Engine.TileCollection(null, ["/build/resources/menu_bck.png"]);
        let Buttons:any = new Engineer.Engine.TileCollection(null, ["/build/resources/menu_level_back.png"]);
        let Levels:any = new Engineer.Engine.TileCollection();
        for(let i = 0; i < 9; i++) Levels.Images.push("/build/resources/level_0"+(i+1)+".png");
        let BackForth:any = new Engineer.Engine.TileCollection();
        BackForth.Images.push("/build/resources/menu_level_left.png");
        BackForth.Images.push("/build/resources/menu_level_right.png");
        let Background:any = new Engineer.Engine.Tile();
        Background.Name = "Back";
        Background.Collection = Backgrounds;
        Background.Index = 0;
        Background.Trans.Scale = LocalSettings.Scale;
        Background.Trans.Translation = new Engineer.Math.Vertex(LocalSettings.Scale.X/2, LocalSettings.Scale.Y/2, 0);
        this.AddSceneObject(Background);
        let Back:any = new Engineer.Engine.Tile();
        Back.Name = "Back";
        Back.Collection = Buttons;
        Back.Index = 0;
        Back.Trans.Scale = new Engineer.Math.Vertex(250, 60, 1);
        Back.Trans.Translation = new Engineer.Math.Vertex(860, 930, 0);
        Back.Events.MouseDown.push(this.BackClick.bind(this).bind(this));
        this.AddSceneObject(Back);
        let LevelDisplay:any = new Engineer.Engine.Tile();
        this._LevelDisplay = LevelDisplay;
        LevelDisplay.Name = "LevelDisplay";
        LevelDisplay.Collection = Levels;
        LevelDisplay.Index = this._PlayerProgress;
        LevelDisplay.Trans.Scale = new Engineer.Math.Vertex(1000, 600, 1);
        LevelDisplay.Trans.Translation = new Engineer.Math.Vertex(960, 500, 0);
        LevelDisplay.Events.MouseDown.push(this.LevelClick.bind(this));
        this.AddSceneObject(LevelDisplay);
        let Left:any = new Engineer.Engine.Tile();
        this._Left = Left;
        Left.Name = "Left";
        Left.Collection = BackForth;
        Left.Index = 0;
        Left.Trans.Scale = new Engineer.Math.Vertex(80, 140, 1);
        Left.Trans.Translation = new Engineer.Math.Vertex(380, 520, 0);
        Left.Events.MouseDown.push(this.LeftClick.bind(this));
        this.AddSceneObject(Left);
        let Right:any = new Engineer.Engine.Tile();
        this._Right = Right;
        Right.Name = "Right";
        Right.Collection = BackForth;
        Right.Index = 1;
        Right.Trans.Scale = new Engineer.Math.Vertex(80, 140, 1);
        Right.Trans.Translation = new Engineer.Math.Vertex(1540, 520, 0);
        Right.Events.MouseDown.push(this.RightClick.bind(this));
        this.AddSceneObject(Right);
        if (LevelDisplay.Index == 0) Left.Active = false;
        else Left.Active = true;
        if (LevelDisplay.Index == this._PlayerProgress) Right.Active = false;
        else Right.Active = true;
    }
    private BackClick(G:any, Args:any) : void
    {
        let Runner:any = this.Data["Runner"];
        Runner.SwitchScene("Menu", false);
    }
    private LeftClick(G:any, Args:any) : void
    {
        Engineer.Util.Log.Print(this._Left);
        if (!this._Left.Active) return;
        this._LevelDisplay.Index = this._LevelDisplay.Index - 1;
        if (this._LevelDisplay.Index == 0) this._Left.Active = false;
        else this._Left.Active = true;
        if (this._LevelDisplay.Index == this._PlayerProgress) this._Right.Active = false;
        else this._Right.Active = true;
        this._Right.Active = true;
    }
    private RightClick(G:any, Args:any) : void
    {
        if (!this._Right.Active) return;
        this._LevelDisplay.Index = this._LevelDisplay.Index + 1;
        if (this._LevelDisplay.Index == 0) this._Left.Active = false;
        else this._Left.Active = true;
        if (this._LevelDisplay.Index == this._PlayerProgress) this._Right.Active = false;
        else this._Right.Active = true;
        this._Left.Active = true;
    }
    private LevelClick(G:any, Args:any) : void
    {
        let CurrentGame:any = this.Data["Game"];
        let Runner:any = this.Data["Runner"];
        let OldGame:any = null;
        if (CurrentGame.Data["GameScene"])
        {
            OldGame = CurrentGame.Data["GameScene"];
            CurrentGame.Scenes.Remove(OldGame);
            Runner.ClearScene("GameScene");
            Runner.Collect();
        }
        let NewGame:any = new GameScene();
        NewGame.Data["Game"] = CurrentGame;
        NewGame.Data["Runner"] = Runner;
        NewGame.Data["DesiredLevel"] = this._LevelDisplay.Index + 1;
        NewGame.Init();
        /*LoadingScene Loading;
        if (!CurrentGame.Data.ContainsKey("LoadingScene"))
        {
            Loading = new LoadingScene();
            CurrentGame.AddScene(Loading);
            Loading.Data["Game"] = CurrentGame;
            Loading.Data["Runner"] = Runner;
        }
        else
        {
            Loading = (LoadingScene)CurrentGame.Data["LoadingScene"];
            Loading.Reset();
        }
        Runner.SwitchScene("LoadingScene", false);*/
        CurrentGame.AddScene(NewGame);
        Runner.SwitchScene("GameScene");
    }
}