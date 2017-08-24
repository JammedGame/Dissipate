export { GameLogic };

import Engineer from "./Engineer";

import { MainMenu } from "./MainMenu";
import { LevelPicker } from "./LevelPicker";

class GameLogic
{
    private _Game:any;
    private _Runner:any;
    public constructor()
    {
        //Engineer.Util.Log.LogEvent = true;
        this._Game = new Engineer.Engine.Game();
        this._Game.Name = "Dissipate";
        this._Runner = new Engineer.Runner.Runner(this._Game, Engineer.Draw.DrawEngineType.ThreeJS);
        let _Menu:any = new MainMenu();
        _Menu.Data["Game"] = this._Game;
        _Menu.Data["Runner"] = this._Runner;
        let _LevelPicker:any = new LevelPicker();
        _LevelPicker.Data["Game"] = this._Game;
        _LevelPicker.Data["Runner"] = this._Runner;
        this._Game.AddScene(_Menu);
        this._Game.AddScene(_LevelPicker);
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}