import emailValidator from '../api/utils/emailValidator.js';
import { expect } from 'chai';

describe('Testing the Email Format Validation', function () {
    it('1. Verify correct email format', function (done) {
        const correctEmail = "parab.ak@northeastern.edu";
        expect(emailValidator(correctEmail)).to.equal(true);
        done();
    });

    it('2. Verify incorrect email format', function (done) {
        const correctEmail = "northeastern.edu";
        expect(emailValidator(correctEmail)).to.equal(false);
        done();
    });
});