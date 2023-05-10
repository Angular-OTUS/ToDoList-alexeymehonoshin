const uuid = require('uuid');

module.exports = class TodoListItemFactory {
  #statuses = ['in-progress', 'completed'];

  create(count = 0) {
    const items = [];

    for(let i = 1; i <= count; i++) {
      items.push(this.#newItem(i));
    }

    return items;
  }

  #newItem(randomValue) {
    return {
      id: uuid.v4(),
      title: `Название задачи ${randomValue}`,
      description: `Много текста с описанием задачи ${randomValue}`,
      status: this.#randomStatus(),
    };
  }

  #randomStatus() {
    const random = Math.round(Math.random(this.#statuses.length - 1));

    return this.#statuses[random];
  }
}
