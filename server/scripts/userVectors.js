// os pacientes o vetor mais top das galaxias (só porque tem o snoopy)
export function getPacientes(){
    const ds = [ 
        { id: 1, login: "gabriel", password: "2000", email: "gabriel@gmail.com", nome:"Gabriel", sobrenome:"", 
            genero:"Masculino", dt_nascimento:'2000-09-13', telefone:"(12) 2959-7375", local:"São Paulo", img_perfil:'perfil-snoopy.png'},
        { id: 2, login: "snoopy", password: "1950", email: "snoopy@gmail.com", nome:"Snoopy", sobrenome:"", 
            genero:"Masculino", dt_nascimento:'1969-09-13', telefone:"(79) 2337-2615", local:"São Paulo", img_perfil:'perfil-snoopy.png'},
        { id: 3, login: "scooby", password: "1950", email: "scooby@gmail.com", nome:"Scoobert", sobrenome:"Cornelius Doo", 
            genero:"Masculino", dt_nascimento:'1950-10-04', telefone:"(61) 3070-0787", local:"São Paulo", img_perfil: 'perfil-scooby.png' },
    ]
    return ds
}
// Get Psicologos
export function getPsicologo(){
    const ds = [ 
        { id: 1, login: "Robson Souza", password: "2000", email: "robson_souza@gmail.com", crp:'CRP-06/123456', nome:"Robson", sobrenome:"Souza", 
            genero:"Masculino", dt_nascimento:'1997-04-13', telefone:"(12) 2959-7375", local:"São Paulo", img_perfil:'psi_1.png',
            especialidade: [1, 2, 4]},
    ]
    return ds
}

export function getEspecialidades(){
    const ds = [ 
        {nome: 'Ansiedade'},
        {nome: 'Casais'},
        {nome: 'Conflitos familiares'},
        {nome: 'Dependencia Química'},
        {nome: 'Insonia'},
    ]
    return ds
}

export function getArtigos(){
    const artigos = [ 
        {
        id_autor: 1,
        img:'quebra-cab.png',
        nome:'Importância da consulta psicologica',
        artigo: `Segundo a OMS em seu relatório sobre Saúde Mental Global ao cumprimento dos 
        objetivos de saúde entre 2013 a 2030. A saúde mental existe em um processo 
        complexo e contínuo de experiências que variam de um estado de bem-estar a 
        estados debilitantes de grande sofrimento e dor emocional.Problemas como crises 
        econômicas, polarização social, emergências de saúde pública e humanitárias 
        generalizadas, deslocamento forçado e a crescente crise climáticas expõe 
        circunstâncias como pobreza, violência e desigualdade como principal elemento de 
        risco ao sofrimentos de problemas de saúde mental.Portanto, nos da Mind, assim 
        como os Objetivos da ODS, temos o compromisso de influenciar no debate sobre 
        saúde mental e disponibilizar um ambiente acolhedor para o bem-estar social. 
        Tendo assim a ciência popular que a sáude psicológica é valida e é um direito de 
        todos.
        <br><br>
        Recomendamos a leitura de artigos aprofundados sobre o assunto:
        <br><br>`,
        ref: "https://www.who.int/teams/mental-health-and-substance-use/world-mental-health-report",
        },
        {
        id_autor: 1,
        img:'tela_celular.png',
        nome:'Números de emergência para segurança',
        artigo: `Os principais numeros de emergência e serviços publicos do brasil: <br>
        Polícia Militar: 190 <br>
        Bombeiros: 193 <br>
        Polícia Civil: 197 <br>
        Disque Denúncia: 118 <br>
        Guarda Municipal: 153 <br>
        Polícia Rodoviária Federal: 191 <br>
        Polícia Rodoviária Estadual: 198 <br>
        Defesa Civil 199: <br>
        Samu: 192`,
        ref: "",
        },
    ]
    return artigos;
}