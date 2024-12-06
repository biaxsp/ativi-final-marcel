/***********************************************************
 *Objetivo: 
 *Data: 27/11/2024
 *Autor:Beatriz Palermo
 *Versão: 1.0
*************************************************************/

  

var ListarAlunos = require('./alunos')
var ListarCursos = require('./cursos')


const getListarCursos = function () {
    let listaCursos = []; 
    let cursos = {}; 

    ListarCursos.cursos.forEach(function (curso) {
        listaCursos.push(curso.nome); 
    });

    cursos.uf = listaCursos; 
    cursos.quantidade = listaCursos.length; 

    return cursos; 
}


const getlistarAlunos = function() {
    let listadosAlunos = [];
    let alunos = {};

    ListarAlunos.alunos.forEach(function(aluno) {
        listadosAlunos.push(aluno.nome);
    });

    alunos.uf = listadosAlunos;
    alunos.total = listadosAlunos.length;

    return alunos;
}


const getmatriculaAluno = function(matricula) {
    let lista = ListarAlunos.alunos;
    let alunoEncontrado = null;

    lista.forEach(function(aluno) {
        if (aluno.matricula === matricula) {
            alunoEncontrado = aluno;
        }
    });

    return alunoEncontrado ? { nome: alunoEncontrado.nome, sexo: alunoEncontrado.sexo } : false;
}


const getCursoSigla = function (siglaCurso) {
    let requisicao = String(siglaCurso).toUpperCase();
    let resultado = [];

    ListarAlunos.alunos.forEach(function (aluno) {
        aluno.curso.forEach(function (cursoItem) {
            if (cursoItem.sigla === requisicao) {
                resultado.push({ nome: aluno.nome, sexo: aluno.sexo });
            }
        });
    });

    return resultado.length > 0 ? resultado : false;
}

const getlistarStatusAlunos = function () {
    let alunosFiltrados = [];

    ListarAlunos.alunos.forEach(function (aluno) {
        if (aluno.status === "Cursando" || aluno.status === "Finalizado") {
            alunosFiltrados.push({
                nome: aluno.nome,
                status: aluno.status
            });
        }
    });

    return alunosFiltrados;
}

const getAlunosPorCurso = function (sigladocurso) {
    let requisicao = String(sigladocurso).toUpperCase();
    let resultado = [];

    ListarAlunos.alunos.forEach(function (aluno) {
        aluno.curso.forEach(function (curso) {
            if (curso.sigla === requisicao) {
                let disciplinasPorStatus = {
                    Aprovado: [],
                    Reprovado: [],
                    Exame: []
                };

                curso.disciplinas.forEach(function (disciplina) {
                    if (disciplina.status === "Aprovado") {
                        disciplinasPorStatus.Aprovado.push({
                            nome: disciplina.nome,
                            status: disciplina.status
                        });
                    } else if (disciplina.status === "Reprovado") {
                        disciplinasPorStatus.Reprovado.push({
                            nome: disciplina.nome,
                            status: disciplina.status
                        });
                    } else if (disciplina.status === "Exame") {
                        disciplinasPorStatus.Exame.push({
                            nome: disciplina.nome,
                            status: disciplina.status
                        });
                    }
                });

                resultado.push({
                    nome: aluno.nome,
                    matricula: aluno.matricula,
                    sexo: aluno.sexo,
                    curso: curso.nome,
                    disciplinas: disciplinasPorStatus
                });
            }
        });
    });

    return resultado.length > 0 ? resultado : false;
}

const getAlunosCursoEAno = function (sigladocurso, anoConclusao) {
    let requisicaoCurso = String(sigladocurso).toUpperCase(); 
    let resultado = [];

    ListarAlunos.alunos.forEach(function (aluno) {
        aluno.curso.forEach(function (curso) {
            if (curso.sigla === requisicaoCurso && curso.conclusao === String(anoConclusao)) {
                resultado.push({
                    nome: aluno.nome,
                    matricula: aluno.matricula,
                    sexo: aluno.sexo,
                    curso: curso.nome,
                    conclusao: curso.conclusao
                });
            }
        });
    });

    return resultado.length > 0 ? resultado : false;
}

module.exports ={
    getListarCursos,
    getlistarAlunos,
    getmatriculaAluno,
    getCursoSigla,
    getlistarStatusAlunos,
    getAlunosPorCurso,
    getAlunosCursoEAno
}








//console.log(getListarCursos());
//console.log(getlistarAlunos());
//console.log(getmatriculaAluno());
//console.log(getCursoSigla());
//console.log(getlistarStatusAlunos());
//console.log(getAlunosPorCurso());
console.log(getAlunosCursoEAno('DS', 2024)); 



