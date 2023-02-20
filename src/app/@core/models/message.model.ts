export interface Message {
  id: string;
  utilisateur_id: string;
  destinataire_id: string;
  corps: string;
  date_envois: string;
  nom: string;
  prenom: string;
  interlocuteur_id: string;
}
