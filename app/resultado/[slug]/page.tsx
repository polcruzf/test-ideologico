import { createClient } from "@supabase/supabase-js";
import "../../test-ideologico/test-ideologico.css";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Faltan variables de entorno de Supabase.");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SharedResultPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: result, error } = await supabase
    .from("test_sessions")
    .select("*")
    .eq("public_slug", slug)
    .single();

  if (error || !result) {
    return (
      <main className="ideology-test">
        <section className="results">
          <h1>Resultado no encontrado</h1>
          <p>Este resultado no existe o ya no está disponible.</p>
        </section>
      </main>
    );
  }

  const topIdeologies = Array.isArray(result.top_ideologies)
    ? result.top_ideologies.slice(0, 3)
    : [];

  return (
    <main className="ideology-test">
      <section className="results shared-result-page">
        <h1>Resultado compartido</h1>

        <section className="party-results-share-section">
          <div className="party-results-share-header">
            <h2>Partido político más afín</h2>
          </div>

          <div className="party-results">
            <div className="party-card">
              <div className="party-card_title">
                <span>Elecciones generales en España</span>
              </div>

              <div className="party-card_results">
                <div className="party-card_finalresult">
                  <strong>{result.national_party}</strong>
                </div>

                <div className="party-card_percentatge">
                  <em>{result.national_party_percentage}% de coincidencia</em>
                </div>
              </div>
            </div>

            <div className="party-card">
              <div className="party-card_title">
                <span>Elecciones autonómicas</span>
              </div>

              <div className="party-card_results">
                <div className="party-card_finalresult">
                  <strong>{result.regional_party}</strong>
                </div>

                <div className="party-card_percentatge">
                  <em>{result.regional_party_percentage}% de coincidencia</em>
                </div>
              </div>
            </div>
          </div>
        </section>

        {topIdeologies.length > 0 && (
          <section className="ideological-profile-card results-profile-card">
            <h2 className="results-profile-title">Perfil ideológico resumido</h2>

            <div className="profile-highlight-list results-profile-highlight-list">
              {topIdeologies.map((item: any) => (
                <div key={item.ideology} className="results-profile-highlight-item">
                  {item.ideology}: {item.percentage}%
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
