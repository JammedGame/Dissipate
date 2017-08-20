export { GameLogic };

import Engineer from "./Engineer";

import { MainMenu } from "./MainMenu";

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
        let Menu:any = new MainMenu();
        Menu.Data["Game"] = this._Game;
        Menu.Data["Runner"] = this._Runner;
        this._Game.AddScene(Menu);
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}