const connection = require('./DataBase');
module.exports = {
   
    async create(request, response){
        const { autor, titulo,text,nome,email} = request.body;
        const people_id = request.headers.authorization;

        const [id] = await connection('users').insert({
            autor,
            titulo,
            text,
            nome,
            email,
            people_id
        });

        return response.json({ id });
    },
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('users').count();

        const users = await connection('users')
            .join('people', 'people.id', 'users.people_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'users.*', 
                'people.name',
                'people.email', 
                'people.whatsapp', 
                'people.city', 
                'people.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(users);
    },
    async delete(request, response){
        const { id } = request.params;
        const people_id = request.headers.authorization;

        const incident = await connection('users')
            .where('id',id)
            .select('people_id')
            .first();

        if(incident.people_id != people_id){
            return response.status(401).json({ erro: 'Operation not permittes.'});

        }

        await connection('users').where('id', id).delete();

        return response.status(204).send();
    }
};