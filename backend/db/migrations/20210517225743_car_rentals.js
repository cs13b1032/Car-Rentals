const commonsSchema = `car_rentals`;
exports.up = async function (knex) {
  console.log(`adding common entities`);
  await knex.raw(
    `CREATE OR REPLACE FUNCTION ${commonsSchema}.set_updated_at_timestamp() 
       RETURNS TRIGGER AS 
       $$ BEGIN NEW.updated_at = NOW(); 
       RETURN NEW; END; $$ 
       LANGUAGE plpgsql;`
  );
};

exports.down = async function (knex) {
  console.log(`dropping common entities`);
  await Promise.all([
    knex.raw(`DROP FUNCTION IF EXISTS ${commonsSchema}.set_updated_at_timestamp`)
  ]);
};
