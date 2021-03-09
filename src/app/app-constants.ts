export class AppConstants {

  public static get baseServidor(): string { return "/api" }

  public static get baseLogin(): string { return this.baseServidor + "/login" }

  public static get baseUrl(): string { return this.baseServidor + "/usuario/" }

  public static get baseAluno(): string { return this.baseServidor + "/aluno/"}
}
