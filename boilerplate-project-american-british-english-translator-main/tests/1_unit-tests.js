const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {

  suite('American to British English', () => {

    test('Translate "Mangoes are my favorite fruit." to British English', (done) => {
      const input = 'Mangoes are my favorite fruit.';
      const output = translator.translate(input, 'american-to-british');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'favourite');
      done();
    });

    test('Translate "I ate yogurt for breakfast." to British English', (done) => {
      const input = 'I ate yogurt for breakfast.';
      const output = translator.translate(input, 'american-to-british');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'yoghurt');
      done();
    });

    test('Translate "We had a party at my friend\'s condo." to British English', (done) => {
      const input = "We had a party at my friend's condo.";
      const output = translator.translate(input, 'american-to-british');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'flat');
      done();
    });

    test('Translate "Can you toss this in the trashcan for me?" to British English', (done) => {
      const input = 'Can you toss this in the trashcan for me?';
      const output = translator.translate(input, 'american-to-british');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'bin');
      done();
    });

    test('Translate "The parking lot was full." to British English', (done) => {
      const input = 'The parking lot was full.';
      const output = translator.translate(input, 'american-to-british');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'car park');
      done();
    });

    test('Translate "Like a high tech Rube Goldberg machine." to British English', (done) => {
      const input = 'Like a high tech Rube Goldberg machine.';
      const output = translator.translate(input, 'american-to-british');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'Heath Robinson device');
      done();
    });

    test('Translate "To play hooky means to skip class or work." to British English', (done) => {
      const input = 'To play hooky means to skip class or work.';
      const output = translator.translate(input, 'american-to-british');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'bunk off');
      done();
    });

    test('Translate "No Mr. Bond, I expect you to die." to British English', (done) => {
      const input = 'No Mr. Bond, I expect you to die.';
      const output = translator.translate(input, 'american-to-british');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'Mr');
      assert.notInclude(output.translation, 'Mr.');
      done();
    });

    test('Translate "Dr. Grosh will see you now." to British English', (done) => {
      const input = 'Dr. Grosh will see you now.';
      const output = translator.translate(input, 'american-to-british');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'Dr');
      assert.notInclude(output.translation, 'Dr.');
      done();
    });

    test('Translate "Lunch is at 12:15 today." to British English', (done) => {
      const input = 'Lunch is at 12:15 today.';
      const output = translator.translate(input, 'american-to-british');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, '12.15');
      done();
    });

  });

  suite('British to American English', () => {

    test('Translate "We watched the footie match for a while." to American English', (done) => {
      const input = 'We watched the footie match for a while.';
      const output = translator.translate(input, 'british-to-american');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'soccer');
      done();
    });

    test('Translate "Paracetamol takes up to an hour to work." to American English', (done) => {
      const input = 'Paracetamol takes up to an hour to work.';
      const output = translator.translate(input, 'british-to-american');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'Tylenol');
      done();
    });

    test('Translate "First, caramelise the onions." to American English', (done) => {
      const input = 'First, caramelise the onions.';
      const output = translator.translate(input, 'british-to-american');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'caramelize');
      done();
    });

    test('Translate "I spent the bank holiday at the funfair." to American English', (done) => {
      const input = 'I spent the bank holiday at the funfair.';
      const output = translator.translate(input, 'british-to-american');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'public holiday');
      assert.include(output.translation, 'carnival');
      done();
    });

    test('Translate "I had a bicky then went to the chippy." to American English', (done) => {
      const input = 'I had a bicky then went to the chippy.';
      const output = translator.translate(input, 'british-to-american');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'cookie');
      assert.include(output.translation, 'fish-and-chip shop');
      done();
    });

    test('Translate "I\'ve just got bits and bobs in my bum bag." to American English', (done) => {
      const input = "I've just got bits and bobs in my bum bag.";
      const output = translator.translate(input, 'british-to-american');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'odds and ends');
      assert.include(output.translation, 'fanny pack');
      done();
    });

    test('Translate "The car boot sale at Boxted Airfield was called off." to American English', (done) => {
      const input = 'The car boot sale at Boxted Airfield was called off.';
      const output = translator.translate(input, 'british-to-american');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'swap meet');
      done();
    });

    test('Translate "Have you met Mrs Kalyani?" to American English', (done) => {
      const input = 'Have you met Mrs Kalyani?';
      const output = translator.translate(input, 'british-to-american');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'Mrs.');
      done();
    });

    test('Translate "Prof Joyner of King\'s College, London." to American English', (done) => {
      const input = "Prof Joyner of King's College, London.";
      const output = translator.translate(input, 'british-to-american');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, 'Prof.');
      done();
    });

    test('Translate "Tea time is usually around 4 or 4.30." to American English', (done) => {
      const input = 'Tea time is usually around 4 or 4.30.';
      const output = translator.translate(input, 'british-to-american');
      assert.property(output, 'text');
      assert.property(output, 'translation');
      assert.include(output.translation, '4:30');
      done();
    });

  });

  suite('Highlight Translation', () => {

    test('Highlight translation in "Mangoes are my favorite fruit."', (done) => {
      const input = 'Mangoes are my favorite fruit.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translation, '<span class="highlight">');
      assert.include(output.translation, '</span>');
      done();
    });

    test('Highlight translation in "I ate yogurt for breakfast."', (done) => {
      const input = 'I ate yogurt for breakfast.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translation, '<span class="highlight">');
      assert.include(output.translation, '</span>');
      done();
    });

    test('Highlight translation in "We watched the footie match for a while."', (done) => {
      const input = 'We watched the footie match for a while.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translation, '<span class="highlight">');
      assert.include(output.translation, '</span>');
      done();
    });

    test('Highlight translation in "Paracetamol takes up to an hour to work."', (done) => {
      const input = 'Paracetamol takes up to an hour to work.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translation, '<span class="highlight">');
      assert.include(output.translation, '</span>');
      done();
    });

  });

});
