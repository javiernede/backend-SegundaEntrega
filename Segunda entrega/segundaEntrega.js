const fs = require('fs/promises');

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async listarAll() {
        try {

            const obj = await fs.readFile(this.ruta, 'utf-8');
            console.log(obj)
            console.log(JSON.parse(obj))

            return JSON.parse(obj);

        } catch (error) {
            return []
        }


    }


    async guardar(obj) {


        try {
            let newId;

            const objs = await this.listarAll()

            if (objs.length == 0) {

                newId = 1;

            } else {

                let newId = objs[objs.length - 1].id + 1 //selecciono el id del objeto

                console.log(newId);

                const newObj = { id: newId, ...obj } /*Es el objeto que voy a guardar */

                objs.push(newObj); /*guardo en el array el objeto*/

                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))

                return newId;
            }
        } catch (error) {
            console.log('Error');
        }


    }

    async actualizar(id, newObj) {
        try {
            const objs = await this.listarAll()
            const indexObj = objs.findIndex((o) => o.id == id)

            if (indexObj == -1) {
                return 'Objeto no encontrado'
            } else {
                objs[indexObj] = { id, ...newObj }
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            }

            return { id, ...newObj }

        } catch (error) {
            console.log('Error')
        }

        return 'Se actualizo';
    }

    eliminar() {
        return 'Se elimino';
    }



}


async function main() {

    const contenedor = new Contenedor('./DB/contenedor-Data.json');

    console.log(contenedor.ruta);


    console.log('guarda los objetos');

    console.log(await contenedor.listarAll());

    console.log(await contenedor.guardar({ titule: "harry", author: "J. K. Rowling" }));

    console.log(await contenedor.guardar({ titule: "Melody", author: "J. K. Rowling" }));

    console.log(await contenedor.actualizar(2, { titule: "harry", author: "J. R. R. Rowling" }));

    console.log(contenedor.eliminar());


}

main();