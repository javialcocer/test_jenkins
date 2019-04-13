
// const chrome = require('selenium-webdriver/chrome'); Ejemplo
const { expect } = require('chai');
const screen = {
  width: 1280,
  height: 720
};
const {Builder, By, Capabilities, Key, until} = require('selenium-webdriver');

let firefox = require('selenium-webdriver/firefox');
const VERSIONS = ['65.0'];
let driver = new Builder().forBrowser('firefox')
            .withCapabilities(Capabilities.firefox().setBrowserVersion('65.0'))
            .usingServer('http://enriquetejeda.com:4444/wd/hub') // Conectamos a nuestro enjambre de navegadores listos para ejecutar nuestras tareas //Servidor para el anjambre
            .setFirefoxOptions(
                new firefox.Options().headless()) // Activamos firefox en modo headless (Sin necesidad de interfaz grafica)
            .build();

var result = '';
var tester = function(){
 const resources = window.performance.getEntriesByType("resource");
   var i = 0;
   var list = new Array();
   resources.forEach(function (resource) {
       var str = resource.name;
       var res = str.split("/");
       if (res[2] == 'www.bexcaret.com') {
         list.push(res[2]);
       }
   });
   if (list.length > 0) {
      return "prod";
   }else{
     return "noprod";
   }
}
describe('Test XCARET.COM - v1', () => {
    /*
    it('Vericar Telefonos - Footer - XCARET.COM - ESPAÑOL', async () => { // Titulo de nuestro Test

        // Nuestra estructura de datos con los telefonos que deben de ir
        let arrayNumeros = [
            "Cancún: (01 998) 883-3143",
            "Playa del Carmen: (01 984) 206-0038",
            "USA-CAN: 1-855-326-0682",
            "Brasil: 0-800-892-3371",
            "Argentina: 0800-122-0384",
            "Colombia: 01-800-952-0705",
            "España: 900-965-224",
            "Chile: 0-800-835-016"
        ];//prueba
        await driver.get('http://local.jenkinsdev.com/'); // Recuerden que la direccion seria local ya que nuestro contenedor es desplegado dentro de la red local

        // Buscamos gracias al webdriver que nos otorga selenium entre los distintos elementos que conforma nuestra web
        await driver.wait(until.elementLocated(By.className('phones')));
        let links = await driver.findElements({css:'#sales > ul.phones > li > a'});
        let flag = false;
        for(let link of links) {
             text = await link.getText();
             console.log(text);
             if(!arrayNumeros.includes(text)){
                flag = true; // Buscamos telefono por telefono si dentro de nuestra estructura encontramos una diferencia con lo que esta en el codigo levantamos nuestro flag como true
             }
         }
        expect(flag).to.equal(false); //Nosotros esperamos que el flag este en falso, osea si esta en TRUE tenemos UN PROBLEMA

    });*/

    /*
    it('Verificar Etiqueta SEO - XCARET.COM', async () => {
         await driver.get('http://local.jenkinsdev.com/');
         // await driver.sleep(20000);
         const title = await driver.findElement(By.name('robots')).getAttribute('content');
         expect(title).to.equal('index, follow');
     });
     */

     it('Verificar Carrito - XCARET.COM', async () => {
         await driver.get('https://www.xcaret.com/es/');
         //await driver.sleep(20000);
       let v = await driver.executeScript(tester);
       expect(v).to.equal("prod");
     });




    after(async () => driver.quit());
});