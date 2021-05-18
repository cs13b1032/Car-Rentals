exports.up = async function (knex) {
    console.log(`creating schemas`);
    await Promise.all([
      knex.raw(`create schema if not exists user_management`),
      knex.raw(`create schema if not exists car_rentals`),
    ]);
  };
  
  exports.down = async function (knex) {
    console.log(`dropping schemas`);
    await Promise.all([
      knex.raw(`drop schema if exists user_management cascade`),
      knex.raw(`create schema if not exists car_rentals`),
    ]);
  };
  