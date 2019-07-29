const catdir = require('./index');

const serverlessMock = {
    service: {
        provider: {
            compiledCloudFormationTemplate: {}
        }
    },
    cli: {
        log: (message) => {
            console.log(message);
        }
    }
};

describe('index', () => {
    describe('catdir', () => {
        it('no catdir found', () => {
            serverlessMock.service.provider.compiledCloudFormationTemplate = require('../data/no.resource.cloudformation.json');
            const instance = new catdir(serverlessMock);
            instance.package();
        });

        it('catdir single param', () => {
            serverlessMock.service.provider.compiledCloudFormationTemplate = require('../data/single.param.cloudformation.json');
            const instance = new catdir(serverlessMock);
            instance.package();

            expect(serverlessMock.service.provider.compiledCloudFormationTemplate.Resources.RetrieveDataLogGroup.Properties.LogGroupName)
            .toBe('{\nthis is some text\n}');
        });

        it('catdir single param - mask', () => {
            serverlessMock.service.provider.compiledCloudFormationTemplate = require('../data/single.param.mask.cloudformation.json');
            const instance = new catdir(serverlessMock);
            instance.package();
            expect(serverlessMock.service.provider.compiledCloudFormationTemplate.Resources.RetrieveDataLogGroup.Properties.LogGroupName)
            .toBe('{\nthis is some text\n}\nsecond text');
        });

        it('catdir two params', () => {
            serverlessMock.service.provider.compiledCloudFormationTemplate = require('../data/two.param.cloudformation.json');
            const instance = new catdir(serverlessMock);
            instance.package();
            expect(serverlessMock.service.provider.compiledCloudFormationTemplate.Resources.RetrieveDataLogGroup.Properties.LogGroupName)
            .toBe('this is some text');
        });

        it('catdir two params - mask', () => {
            serverlessMock.service.provider.compiledCloudFormationTemplate = require('../data/two.param.mask.cloudformation.json');
            const instance = new catdir(serverlessMock);
            instance.package();
            console.log(serverlessMock.service.provider.compiledCloudFormationTemplate.Resources.RetrieveDataLogGroup.Properties.LogGroupName)
            expect(serverlessMock.service.provider.compiledCloudFormationTemplate.Resources.RetrieveDataLogGroup.Properties.LogGroupName)
            .toBe('this is some text\n');
        });
    });
});