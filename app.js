/********************************************************************************************************************************
 * Objetivo: API para retornar dados de estados e cidades
 * Data: 30/10/2024
 * Autor: Beatriz Palermo 
 * versão: 1.0
***********************************************************************************************************************/

const {request, response} = require("express")
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const app = express()


app.use((request, response, next)=>{
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET')
    app.use(cors())
    next()
})

const cursos = require('./modulo/funcoes.js')

app.get('/v1/lion-school/cursos', cors(), async function(request, response){

    let dados = cursos.getListarCursos()

    response.status(200)
    response.json(dados)
})


app.get('/v1/lion-school/alunos', cors(), async function(request, response){
    let dados = cursos.getListarAlunos()

    response.status(200)
    response.json(dados)
})

app.get('/v1/lion-school/alunos/filtro', async function(request, response) {
    const { status, sigla, ano_conclusao } = request.query
    let dados


        if (sigla && status) {
            dados = cursos.getAlunosPorCurso(sigla, status)
            if (dados) {
                return response.status(200).json(dados)
            } else {
                return response.status(404).json({ status: 404, message: 'Não foi possível encontrar o aluno ou disciplina' })
            }
        }
        
    if (status) {
        dados = cursos.getlistarStatusAlunos(status)
        if (dados) {
            return response.status(200).json(dados)
        } else {
            return response.status(404).json({ status: 404, message: 'Nenhum aluno encontrado com esse status' })
        }
    }

    if (sigla && ano_conclusao) {
        dados = cursos.getAlunosCursoEAno(sigla, ano_conclusao)
        if (dados) {
            return response.status(200).json(dados)
        } else {
            return response.status(404).json({ status: 404, message: 'Não foi possível encontrar o curso ou ano de conclusão' })
        }
    }

    return response.status(400).json({ status: 400, message: 'Parâmetros insuficientes para realizar a busca' })
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response) {
    let matricula = request.params.matricula
    let dados = cursos.getmatriculaAluno(matricula)
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado este aluno'})
    }
})

app.get('/v1/lion-school/alunos/cursos/:sigla', cors(), async function (request, response){
    
    let siglaCurso = request.params.sigla
    let dados = cursos.getCursoSigla(siglaCurso)
    
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado este curso'})
    }
})


app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})

